import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useToast } from '@chakra-ui/react';
import {  useState } from 'react';
import "../styles/allTasks.css"
import { useDispatch, useSelector } from 'react-redux';
import { createNewTask,  removeTask,  updateExistingTask } from '../redux/tasksSlice';
import Loader from './Loader';

const AllTask = ({modalWork,initialRef,finalRef}) => {
  const[task,setTask]=useState({
    
    title:"",
    description:"",
    status:"PENDING",
  });

  const[editedTask,setEditedTask]=useState(
    {
        _id:"",
        title:"",
        description:"",
        status:"PENDING"
      }
 )

  const toast = useToast();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const authHeaders = useSelector((state) => state.auth.headers);
 
  const handleChange=(event)=>{
    setTask({...task,[event.target.name]:event.target.value})
 }

 const editHandleChange=(event)=>{
    setEditedTask({...editedTask,[event.target.name]:event.target.value})
 }

 const handleEditTask=(id)=>{

  const result = tasks.find((task)=>task._id === id);
  
  setEditedTask(result);
     
  }

 //  dispatching createNewTask action 

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


const handleUpdateTask = async (editedTask) => {
  try {
    await dispatch(updateExistingTask({ id: editedTask._id, data: editedTask }, authHeaders));
    setEditedTask({
      _id: "",
      title: "",
      description: "",
      status: "PENDING"
    });
    toast({
      title: 'Changes Saved..',
      description: 'Task Details Updated..',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    // Handle error state here if needed
  }
};

const handleDeleteTask = (id)=>{
  dispatch(removeTask( id , authHeaders));
  return toast({
      title: 'Deleted',
      description: "Task Deleted From List",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
}


if (loading) {
  return <Loader/>;
}
  

  return (
    <div className='allTasks'>
       <Button className='add-task-btn' rightIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={modalWork.onOpen}>
      Add Task Into List
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
        return <div key={task.id} className='singleTask' style={
          task.status === "COMPLETED"
            ? {
                backgroundImage:
                  "linear-gradient(to bottom, #7ef4e4, #83f3e3, #88f2e1, #8df1e0, #91f0df)",
              }
            : null
        }>
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
                   onClick={()=>handleEditTask(task._id)}
/>
                  <IconButton
                     variant='outline'
                     colorScheme='red'
                    aria-label='Delete task'
                    icon={<DeleteIcon />}
                    onClick={()=>handleDeleteTask(task._id)}
                            />
                  </div>
            </div>
      })
     }
   </div>
   <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={editedTask._id || editedTask.title ?true:false}
                onClose={modalWork.onClose}
                isCentered={true}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Your Task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl isRequired >
                      <FormLabel>Title</FormLabel>
                      <Input name="title" value={editedTask.title} 
                        
                        ref={initialRef}
                        
                        placeholder="Enter Title"
                        onChange={editHandleChange}
                       
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired >
                      <FormLabel>description</FormLabel>
                      <Input 
                        name="description" value={editedTask.description}
                        
                        placeholder="Enter description"
                        onChange={editHandleChange}
                        
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Choose an option:</FormLabel>
                      <Select
                        
                       name='status' value={editedTask.status}
                        placeholder="change status of task"
                        onChange={editHandleChange}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </Select>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={()=>handleUpdateTask(editedTask)} >
                      Save Changes
                    </Button>
                    <Button onClick={()=>setEditedTask({
                                  title:"",
                                  description:"",
                                  status:"PENDING"

                    })}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
    </div>
  )
}

export default AllTask