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

  useEffect(() => {

  // Listen for queue updates from robot
  MessageRouter.queue.onQueue((items) => {
    setQueueItems(items);
  });

  return () => {
    MessageRouter.queue.removeListener();
  };

  }, []);

  const handleDeleteQueueItem = (queueId: string) => {QueuePublisher.deleteFromQueue(queueId);};


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
          <BackButton onClick={() => navigate(-1)} />          
          <SearchButton onClick={() => setIsSearching(true)}/>
        </PageHeader>
      )}
      
      <ScrollableView gap={10}> {filteredMovements.map(movement => (<Button  key={`${movement.kind}-${movement.name}`} label={movement.name} onClick={() => handleMovementClick(movement)}/>))} </ScrollableView>
      
      <BottomBar>
        <PopUpButton position='relative' onClick={()=>setIsSheetOpen(true)}/>
      </BottomBar>

      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <QueueList items={queueItems} onClose={() => setIsSheetOpen(false)} onDelete={handleDeleteQueueItem}/>
      </BottomSheet>
    </div>
  );
}