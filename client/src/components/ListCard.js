import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function  ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    let listLoadState = false;
    let currentList = store.getListById(idNamePair._id);
    let list= null;
    let likes = 0;
    let publishedDate = null;
    let views = 0;
    let dislikes = 0;
    let comments = [];
    currentList = Promise.resolve(currentList).then(function(value) {
        list = value;
        currentList = value;
        likes = value.likes;
        dislikes = value.dislikes;
        views = value.views
        comments = value.comments;
        publishedDate = value.publishedDate;
    });
    let key = idNamePair._id;
    let a = key + "a";
    let b = key + "b";
    let c = key + "c";
    console.log(a);
    console.log(key)
    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }

    function handleLike(event) {
        //event.stopPropagation();
        likes++;
        document.getElementById(a).innerHTML = likes;
        store.likeList(key);

    }

    function handleDislike(event) {
        //event.stopPropagation();
        dislikes++;
        document.getElementById(b).innerHTML = dislikes;
        store.dislikeList(key);

    }

    function handleView() {
        store.increaseView(key);
    }

    function expandList(event) {
        //event.stopPropagation();
        listLoadState = !listLoadState;
        views++;
        document.getElementById(c).innerHTML = "Views: " + views;
        handleView();
    }
    
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let cardElement;
    
    if (listLoadState) {
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            
            style={{
                fontSize: '48pt',
                width: '100%'
            }}


        >

                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}
                <div id={c} style={{fontSize: '20pt'}}>Views: {views}</div>
                <div style={{fontSize: '20pt'}}>Published Date: {publishedDate}</div>
                </Box>
                
                <Box>
                    <IconButton>
                        <ThumbUpIcon onClick={handleLike} style={{fontSize: '48pt'}}/>
                    </IconButton>
                    <div id={a}></div>
                </Box>

                &nbsp;
                &nbsp;
                <Box>
                    <IconButton>
                        <ThumbDownIcon onClick={handleDislike} style={{fontSize: '48pt'}}/>
                    </IconButton>
                    <div id={b}></div>
                </Box>

                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton  onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton>
                        <KeyboardArrowDownIcon onClick={expandList} style={{fontSize: '48pt'}}/>
                    </IconButton>
                </Box>
                

        </ListItem>
    }

    else {
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            
            style={{
                fontSize: '48pt',
                width: '100%'
            }}


        >

                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}
                <div id={c} style={{fontSize: '20pt'}}>Views: {views}</div>
                <div style={{fontSize: '20pt'}}>Published Date: {publishedDate}</div>
                </Box>
                
                <Box>
                    <IconButton>
                        <ThumbUpIcon onClick={handleLike} style={{fontSize: '48pt'}}/>
                    </IconButton>
                    <div id={a}></div>
                </Box>

                &nbsp;
                &nbsp;
                <Box>
                    <IconButton>
                        <ThumbDownIcon onClick={handleDislike} style={{fontSize: '48pt'}}/>
                    </IconButton>
                    <div id={b}></div>
                </Box>

                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton  onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton>
                        <KeyboardArrowDownIcon onClick={expandList} style={{fontSize: '48pt'}}/>
                    </IconButton>
                </Box>
                

        </ListItem>    }
    

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;