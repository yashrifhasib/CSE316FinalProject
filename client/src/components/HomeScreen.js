import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home';
import DeleteModal from './DeleteModal'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import FunctionsIcon from '@mui/icons-material/Functions';
import apis from '../api'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);


    function handleHome() {
        auth.searchType = "Home";
    }
    function handleGroup() {
        auth.searchType = "Community";
    }
    function handlePerson() {
        auth.searchType = "User"
    }
    function handleSum() {
        auth.searchType = "All"
    }

    function handleSubmit(ev) {
        if (ev.code === "Enter") {
            switch(auth.searchType) {
                case "Home":
                    break;
                case "Community":
                    break;
                case "User":
                    break;
                case "All":
                    break;
            }
        }
    }

    function handleCreateNewList() {
        store.createNewList();
    }

    let listCard = "";

    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <div id="searchBar" style={{width: '100%'}}>
                <IconButton >
                    <HomeIcon onClick={handleHome} style={{fontSize:'200%', }} />
                </IconButton>
                <IconButton>
                    <GroupsIcon onClick={handleGroup} style={{fontSize:'200%'}}/>
                </IconButton>
                <IconButton>
                    <PersonIcon onClick={handlePerson} style={{fontSize:'200%'}}/>
                </IconButton>
                <IconButton>
                    <FunctionsIcon onClick={handleSum} style={{fontSize:'200%'}}/>
                </IconButton>
                <input type="text" />
                <span style={{marginLeft: '50%'}}>Sort By</span>
                <IconButton>
                    <SortIcon onKeyPress={handleSubmit} style={{fontSize:'200%', marginRight: '50%'}}/>
                </IconButton>
            </div>
            
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <DeleteModal/>
            </div>

            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;