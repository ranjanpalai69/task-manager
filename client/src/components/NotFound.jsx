import { Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react';
import "../styles/notFound.css";
import  image from "../assets/no-data-img.png"

import {  useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { createNewTask } from '../redux/tasksSlice';
// import { addTask } from '../redux/actions/task.actions';


const DataNotFound = ({modalWork,initialRef,finalRef}) => {

    const toast = useToast();
    const dispatch = useDispatch();
    const authHeaders = useSelector((state) => state.auth.headers);
    const[task,setTask]=useState({
    
      title:"",
      description:"",
      status:"PENDING",
    });


    const handleChange=(event)=>{
      setTask({...task,[event.target.name]:event.target.value})
   }

  
 const handleAddTask=(task)=>{
  if(task.title==="" || task.description==="" ){
    return toast({
        title: 'Error Occured',
        description: "Please Fill All Fields",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
  }
  

  dispatch(createNewTask({ ...task }, authHeaders));
 
  modalWork.onClose();

 return toast({
    title: 'Success',
    description: "Task Added..",
    status: 'success',
    duration: 2000,
    isClosable: true,
  })
  
}


  return (
    <div className="no-data-container">
      
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Z0nNcwPrE1JRCOYl5Zody3mkXvygbCuV1w&usqp=CAU"
          alt="Data Not Found"
          className="not-found-image"
        />
      
      <h1 className="not-found-header">Data Not Found</h1>
      <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue" variant='outline' alignItems={"center"} onClick={modalWork.onOpen}>
    Add First List
  </Button>
      
    <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={modalWork.isOpen}
                onClose={modalWork.onClose}
                isCentered={true}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Enter Task Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl isRequired >
                      <FormLabel>Title</FormLabel>
                      <Input name="title" value={task.title} 
                        
                        ref={initialRef}
                        
                        placeholder="Enter Title"
                        onChange={handleChange}
                       
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired >
                      <FormLabel>description</FormLabel>
                      <Input 
                        name="description" value={task.description}
                        
                        placeholder="Enter description"
                        onChange={handleChange}
                        
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Choose an option:</FormLabel>
                      <Select
                        
                       name='status' value={task.status}
                        placeholder="select status of task"
                        onChange={handleChange}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </Select>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3}  onClick={()=>handleAddTask(task)}>
                      Save
                    </Button>
                    <Button onClick={modalWork.onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
    </div>
  )
}

export default DataNotFound;