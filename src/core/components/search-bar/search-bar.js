import { Input, Popover, List } from "antd";
import { useState } from "react";

const { Search } = Input;

function SearchBar() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const content = (
        <div>
            <List>
                
            </List>
        </div>
    )

    function searchGlobal() {

    }

    return (
        <div>
            <Search className="search-input" placeholder="Search..." value={search}/>
            <Popover placement="topLeft" content={content} open={open}>
            </Popover>
        </div>
    );
}

export default SearchBar;