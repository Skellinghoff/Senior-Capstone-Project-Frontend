import React from 'react'

const FilterItem = (props) => {
    return (
        <div className='list-item'>
            <div>
                <i className={props.cn} style={{ color: props.color }}></i>
                <p>{props.label}</p>
            </div>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default FilterItem