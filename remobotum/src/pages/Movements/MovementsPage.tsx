import './MovementsPage.css';
import { type JSX, useEffect, useState } from 'react';
import { PopUpButton, BackButton, FilterButton, SearchButton } from '../../components/atoms/IconButton/IconButton';
import ScrollableView from '../../components/molecules/ScrollableButtonList/ScrollableView';
import { Button } from '../../components/atoms/Button/Button';
import QueueList from '../../features/queues/components/QueueList/QueueList';
import BottomSheet from '../../components/organisms/BottomSheet/BottomSheet';
import PageHeader from '../../components/molecules/PageHeader/PageHeader';
import BottomBar from '../../components/molecules/BottomBar/BottomBar';
import { type QueueItem } from '../../features/queues/components/QueueList/QueueList';
import { useNavigate } from "react-router-dom";
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import { type RobotAction } from '../../features/connection/listeners/MovementListener';
import MessageRouter from '../../features/connection/messaging/MessageRouter';
import MovementPublisher from '../../features/connection/publishers/MovementPublisher';
import QueuePublisher from '../../features/connection/publishers/QueuePublisher';



// const MOVEMENTS: Movement[] = [
//   { id: 1, name: 'A' },
//   { id: 2, name: 'B' },
//   { id: 3, name: 'C' },
//   { id: 4, name: 'D' },
//   { id: 5, name: 'E' },
//   { id: 6, name: 'F' },
//   { id: 7, name: 'G' },
//   { id: 8, name: 'H' },
//   { id: 9, name: 'I' },
//   { id: 10, name: 'J' },
//   { id: 11, name: 'K' },
//   { id: 12, name: 'L' },
//   { id: 13, name: 'M' },
//   { id: 14, name: 'N' },
//   { id: 15, name: 'O' },
//   { id: 16, name: 'P' },
//   { id: 17, name: 'Q' },
//   { id: 18, name: 'R' },
//   { id: 19, name: 'S' },
//   { id: 20, name: 'T' },
//   { id: 21, name: 'U' },
//   { id: 22, name: 'V' },
//   { id: 23, name: 'W' },
//   { id: 24, name: 'X' },
//   { id: 25, name: 'Y' },
//   { id: 26, name: 'Z' },

// ];

export default function MovementsPage(): JSX.Element
{
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [movements, setMovements] = useState<RobotAction[]>([])

  const filteredMovements = movements.filter(movement => movement.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleMovementClick = (movement: RobotAction) => {MovementPublisher.addToQueue(movement)}

  useEffect(() => {

    MessageRouter.movements.onMovements((actions) => {
        setMovements(actions);
    });

    MovementPublisher.getMovements();

    return () => {
        MessageRouter.movements.removeListener();
    };

}, []);

  const handleDeleteQueueItem = (queueId: string) => {QueuePublisher.deleteFromQueue(queueId);};

  MovementPublisher.getMovements();

  useEffect(() => {MessageRouter.movements.onMovements((actions) => {setMovements(actions);});

  return() => {MessageRouter.movements.removeListener();};
  }, []);


  return (
    <div className="movements-page-wrapper">
      {isSearching ? (
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClose={() => {
            setIsSearching(false);
            setSearchQuery('');
          }}
        />
      ) : (
        <PageHeader>
          <BackButton onClick={() => navigate('/')} />
          
          <SearchButton
            onClick={() => setIsSearching(true)}
          />

          <FilterButton />
        </PageHeader>
      )}
      
      <ScrollableView gap={10}> {filteredMovements.map(movement => (<Button key={movement.id} label={movement.name} onClick={() => handleMovementClick(movement)}/>))} </ScrollableView>
      
      <BottomBar>
        <PopUpButton onClick={()=>setIsSheetOpen(true)}/>
      </BottomBar>

      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <QueueList items={queueItems} onClose={() => setIsSheetOpen(false)} onDelete={handleDeleteQueueItem}/>
      </BottomSheet>
    </div>
  );
}