import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import './App.scss';
import { MovableItem } from './components/Items';
import Dragdrop from './components/Columns';
import { useState } from 'react';


function App() {
    const [showTable, setShowTable] = useState(false)
    const [parentValue, setParentValue] = useState({
      name: '',
      nickname: '',
      gender: ''
    });

    interface ItemsTypes {
      id: number,
      name: string,
      column: string,
      type: string,
      nameValue?: string,
      genderValue?: string,
      nickNamevalue?: string,
      finalValue: string
    }

  const [items, setItems] = useState<ItemsTypes[]>([
    {id: 1, name: 'name', column: 'Column 1', type: 'name', nameValue: '', finalValue: ''},
    {id: 2, name: 'gender', column: 'Column 1', type: 'gender', genderValue: '', finalValue: ''},
    {id: 3, name: 'nickname', column: 'Column 2', type: 'nickname', nickNamevalue: '', finalValue: ''}
  ])

  const isMobile = window.innerWidth < 600;

  const handleChildValue = (value: any) => {
    setParentValue(value);
  }

  console.log(parentValue)

  const returnItemsForColumn = (columnName: any) => {
    return items
          .filter((item) => item.column === columnName)
          .map((item) => (
                <MovableItem key={item.id} name={item.name} setItems={setItems} type={item.type} onChildValue={handleChildValue} valueName={parentValue.name} valueNickName={parentValue.nickname} valueGender={parentValue.gender} />
                )
          )
  }


  // Filter collection
  const filteredNameValue = items.filter(item => item.name === 'name');
  const filteredNicknameValue = items.filter(item => item.name === 'nickname');
  const filteredGenderValue = items.filter(item => item.name === 'gender');
  const filteredNames = items.filter(item => item.column === 'Column 2').map((item, id) => { return (
    <>
        <tr key={item.id}>
          <th scope='row'>{id += 1}</th>
          <td>{item.finalValue}</td>
        </tr>
    </>
  )});

  // Here the magic happens, we make sure to update
  // the sets independently based on a value they have
  filteredNameValue.forEach(item => {
    item.nameValue = parentValue.name;
    item.finalValue = parentValue.name
  });
  filteredNicknameValue.forEach(item => {
    item.nickNamevalue = parentValue.nickname
    item.finalValue = parentValue.nickname
  })
  filteredGenderValue.forEach(item => {
    item.genderValue = parentValue.gender
    item.finalValue = parentValue.gender
  })

  const Table = () => {
    return (
     
    <table data-testid="table" className='w-25 p-3 extra-table'>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Input Value</th>
        </tr>
      </thead>
      <tbody>
        {filteredNames}
      </tbody>
   </table>
     
    )
  }

  return (
    <div data-testid="page" className='flex'>
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="container">
        <Dragdrop   title='Column 1' className='column first-column'>
          {returnItemsForColumn('Column 1')}
        </Dragdrop>
        <Dragdrop title='Column 2' className='column second-column'>
          {returnItemsForColumn('Column 2')}
        </Dragdrop>
      </div>
    </DndProvider>
    <button data-testid="save" className='btn btn-outline-success extra' onClick={() => setShowTable(true)}>Save</button>
    {showTable && <Table />}
    </div>
  );
}

export default App;

