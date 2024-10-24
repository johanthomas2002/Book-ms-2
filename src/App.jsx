import { Button, Form, Modal } from 'react-bootstrap';
import './App.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, removeBook } from './Store/bookSlice';


function App() {

  
  const [name,setName] = useState('');
  const [author,setAuthor] = useState('');

  // console.log(name);
  // console.log(author);
  
  const dispatch = useDispatch();
  

  // state for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function to add book
  const handleAdd = () => {
    if(name!='' || author!=''){
      dispatch(addBook({name:name,author:author}));

      setName('');
      setAuthor('');

       handleClose(); 

   }else{
    alert('Please enter all details')
   }

  }

  const books = useSelector((state)=>state.bookReducer.books);
  console.log(books);
  

  return (
    <>
      <h1 className='text-center text-success mt-5'>Book Managment System</h1>

      <div className='text-center mt-5'>
        <button className='btn btn-primary fs-5' onClick={handleShow}>Add Book</button>
      </div>

      {/* results */}
      <div className="container mt-5 d-flex justify-content-center">
        <table className='text-center text-light fs-5'>
          <thead>
            <tr className='border'>
              <th className='border'>Book Name</th>
              <th className='border'>Author Name</th>
              <th className='border'>Edit</th>
              <th className='border'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
            books?.length>0?books.map((book,index)=>(
                <tr key={index}>
                <td className='border'>{book.name}</td>
                <td className='border'>{book.author}</td>
                <td className='border'><Button className='bg-warning'><i class="fa-solid fa-pen-to-square"></i></Button></td>
                <td className='border'><Button className='text-danger' onClick={()=>dispatch(removeBook(index))}><i class="fa-solid fa-trash"></i></Button></td>
              </tr>
            )):<p className='text-danger'>Nothing to display</p>
              
            }
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className='bg-light'>
          <Modal.Title className='bg-light'>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-light'>
          <Form.Control type="text" placeholder="Enter Book Name"  className='mb-3' onChange={(e)=>setName(e.target.value)}/>
          <Form.Control type="text" placeholder="Enter Author Name" onChange={(e)=>setAuthor(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>handleAdd()}>Add</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default App
