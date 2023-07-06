import React from 'react'
import { useDrop } from 'react-dnd'

interface Value {
  children: any,
  className: string,
  title: string
}
function Dragdrop({children, className, title} : Value) {

    const [, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
    });

    return (
        <div ref={drop} className={className}>
            {title}
            {children}
        </div>
    )
}

export default Dragdrop