import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function SearchToolBar() {
    const { store } = useContext(GlobalStoreContext);

    function handleHome() {
        
    }
    function handleCommunity() {
        
    }
    function handleUser() {
        
    }
    function handleSummation() {

    }

    return (
        <div id="search-toolbar">
            
            <Button 
                id='home-button'
                onClick={handleHome}
                variant="contained">
                    <HomeIcon />
            </Button>
            <Button 
                id='community-button'
                onClick={handleCommunity}
                variant="contained">
                    <PeopleAltIcon />
            </Button>
            <Button 
                id='user-button'
                onClick={handleUser}
                variant="contained">
                    <PersonIcon />
            </Button>
            <Button 
                id='summation-button'
                onClick={handleSummation}
                variant="contained">
                    <FunctionsIcon />
            </Button>
            <input type="text" />
        </div>
    )
}

export default SearchToolBar;