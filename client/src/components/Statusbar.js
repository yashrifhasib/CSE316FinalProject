import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);  
    
    
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    if (auth.loggedIn != null) {
        return (
            <div id="top5-statusbar">
                <Typography variant="h3">{auth.loggedIn}</Typography>
            </div>    
        );
    }
    else {
        if (auth.loggedIn) {
            return (
                <div id="top5-statusbar">
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h3">Your Lists</Typography>
            </div>
            )
        }
        else {
            return (
                <div id="top5-statusbar">

                </div>
            )
        }
        
    }
    
}

export default Statusbar;