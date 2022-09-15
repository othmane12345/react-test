import { Input } from "antd";
const { Search } = Input;

function SearchBar() {
    return (
        <div>
            <Search className="search-input" placeholder="Search..." />
        </div>
    );
}

export default SearchBar;