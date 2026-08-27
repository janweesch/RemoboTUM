import { type JSX, useState} from "react";
import {SearchButton, FilterButton, PopDownButton} from "../../../../components/atoms/IconButton/IconButton";
import ScrollableView from "../../../../components/molecules/ScrollableButtonList/ScrollableView";
import ListItem from "../../../../components/molecules/ListItem/ListItem";
import "./QueueList.css";
import PageHeader from "../../../../components/molecules/PageHeader/PageHeader";
import BottomBar from "../../../../components/molecules/BottomBar/BottomBar";
import SearchBar from "../../../../components/molecules/SearchBar/SearchBar";


export interface QueueItem {
  queueId: string;
  movementId: number;
  name: string;
}

interface QueueListProps {
  items: QueueItem[];
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function QueueList({items, onClose, onDelete}: QueueListProps): JSX.Element {

    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    const filtereditems = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="queue-list">
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
                <SearchButton position="top-left-fixed" onClick={() => setIsSearching(true)}/>
                <FilterButton />
              </PageHeader>
            )}

      <ScrollableView gap={10}>{filtereditems.map((item, index) => (<ListItem key={item.queueId} id={item.queueId} sequencenumber={index + 1} name={item.name}onDelete={onDelete}/> ))} </ScrollableView>
      
      <BottomBar>
        <PopDownButton onClick={onClose}/>
      </BottomBar>
    </div>
  );
}