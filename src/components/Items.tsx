import React from 'react';
import { useDrag } from 'react-dnd';

interface MovableItemTypes {
  name: string;
    setItems: any;
    type: string;
    onChildValue: any;
    valueName: string;
    valueGender: string;
    valueNickName: string;

}



export const MovableItem = ({name, setItems, type, onChildValue, valueName, valueGender, valueNickName}: MovableItemTypes) => {


    // console.log(inputValues)

    const changeItemColumn = (currentItem:any, columnName:any) => {
        setItems((prevState: any) => {
            return prevState.map( (e: any) => {
                return {
                    ...e,
                    column: e.name === currentItem.name ? columnName : e.column,
                }
            })
        })
    }

    const [{ isDragging }, drag] = useDrag({
        item: {name},
        type: 'Our first type',
        end: (item, monitor) => {
            const dropResult:any = monitor.getDropResult();
            if(dropResult && dropResult.name === 'Column 1') {
                changeItemColumn(item, 'Column 1')
            } else {
                changeItemColumn(item, 'Column 2')
            }
        } ,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div data-testid="items" ref={drag} className='movable-item' style={{  opacity }}>
        {type === 'name' ?
          <div className='text-inputs'>
            <fieldset>
                <label htmlFor="name">Your name:</label>
                <input type="text" id='name' name='name' autoComplete='off' value={valueName} onChange={(e) => {
                onChildValue((x: any) => {
                    return {
                        ...x,
                        name: e.target.value
                    }
                })
                }}/>
            </fieldset>
          </div>
          : type === 'gender' ?
          <div className='w-100 p-3'>
            <fieldset>
              <label htmlFor="gender">Your gender:</label> <br />
              <label htmlFor='male'>
                <input type="radio" name="gender"  id='male' checked={valueGender === 'Male'} onChange={(e) => {
                onChildValue((x: any) => {
                    return {
                        ...x,
                        gender: 'Male'
                    }
                })
                }}/>
                Male
              </label> <br />

              <label htmlFor='female'>
                <input type="radio" name="gender"  id='female' checked={valueGender === 'Female'} onChange={(e) => {
                onChildValue((x: any) => {
                    return {
                        ...x,
                        gender: 'Female'
                    }
                })
                }}/>
                Female
              </label>

            </fieldset>
          </div> :
          <div className='text-inputs'>
            <fieldset>
              <label htmlFor="nickname">Your nickname:</label>
              <input type="text" id='nickname' name='nickname' autoComplete='off' value={valueNickName} onChange={(e) => { 
              onChildValue((x: any) => {
                  return {
                      ...x,
                      nickname: e.target.value
                  }
              })
              }}/>
            </fieldset>
          </div>
        }
        </div>
    )
}
