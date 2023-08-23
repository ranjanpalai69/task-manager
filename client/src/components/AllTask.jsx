import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import "../styles/allTasks.css"
import { useDispatch, useSelector } from 'react-redux';
import { createNewTask } from '../redux/tasksSlice';

const AllTask = ({modalWork,initialRef,finalRef}) => {
  const[task,setTask]=useState({
    
    title:"",
    description:"",
    status:"PENDING",
  });
  const toast = useToast();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const authHeaders = useSelector((state) => state.auth.headers);
 
  const handleChange=(event)=>{
    setTask({...task,[event.target.name]:event.target.value})
 }

 //  dispatching addtask action 

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
    <div className='allTasks'>
       <Button className='add-task-btn' rightIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={modalWork.onOpen}>
      Add task to list
       </Button>
       {/* modal pop-up  */}
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

       <div className='task-container'>
     {
      tasks?.map((task)=>{
        return <div key={task.id} className='singleTask'>
                  <Text className="task-title" fontWeight='bold'>
                 {task.title} &nbsp;
                  {
                    task.status === "PENDING" ? <Badge ml='1' colorScheme='cyan'>
                    {task.status}
                  </Badge> : task.status === "IN PROGRESS" ?<Badge ml='1' colorScheme='orange'>
        {task.status}
      </Badge> : <Badge ml='1' colorScheme='green'>
        {task.status}
      </Badge>
                  }
                    </Text>
                  <p className='task-desc'>{task.description}</p>
                  <div className='func-btn'>

                  <IconButton
                   variant='outline'
                    colorScheme='cyan'
                    aria-label='Edit task'
                   icon={<EditIcon />}
                  //  onClick={()=>handleEditTask(task.id)}
/>
                  <IconButton
                     variant='outline'
                     colorScheme='red'
                    aria-label='Delete task'
                    icon={<DeleteIcon />}
                    // onClick={()=>handleDeleteTask(task.id)}
                            />
                  </div>
            </div>
      })
     }
   </div>
    </div>
  )
}

export default AllTask