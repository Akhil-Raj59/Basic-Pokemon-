import React from 'react';

function Search(props) {
    return (
        <div className='w-[500px]'>
            <input
                className='w-full border-4 p-3 mt-3 '
                type="text"
                placeholder='Pokemon name...'

            />
        </div>
    );
}

export default Search;