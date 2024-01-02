
"use client"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    Heading, 
    Input,
    Button,
    Flex
} from '@chakra-ui/react';
import Head from 'next/head';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { useEffect, useState } from 'react';



const steps = [
    { title: 'Name', description: 'Enter your name' },
    { title: 'Job Title', description: 'Enter your job title' },
]

function WelcomeModalInner() {
    const {currentUser, setCurrentUser, isEditing} = useCurrentUser();
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })
    const [name, setName] = useState(null as null | string); 
    if (!isEditing) {
        return null; 
    } 

    return <>
        <Modal
            isOpen
            onClose={() => {
                // If there is a current user (and we are editing it)
                // Then we can allow the modal to close with an escape button
                // Otherwise ignore the escape button
                if(currentUser){
                    setCurrentUser(currentUser);
                }
            }}

        >
                    <ModalOverlay />
            <ModalContent padding="2em">
                <Box >
                    <Stepper index={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink='0'>
                                    <StepTitle>{step.title}</StepTitle>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box>
                    {activeStep === 1 && <>
                        <form onSubmit={(e) =>{
                            e.preventDefault();
                            const name = new FormData(e.currentTarget).get("name");
                            if(!name){
                                throw new Error("Name did not exist in form");
                            }
                            setName(name as string);
                            setActiveStep(2);
                        }}>
                        <Heading fontSize={"2xl"}  margin={"1em 0"}>Enter your name</Heading>
                        <Input name ="name" placeholder='Name' isRequired defaultValue={currentUser?.name}/>
                        <Flex justifyContent={"flex-end"}  margin="1em">
                        <Button variant="solid" colorScheme='blue' type="submit">Next</Button>
                        </Flex>
                        </form>
                    </>}
                    {activeStep === 2 && <>
                        <form onSubmit={(e) =>{
                            e.preventDefault();

                            const title = new FormData(e.currentTarget).get("title");
                            if(!title){
                                throw new Error("Title did not exist in form");
                            }     
                            if(!name) {
                                throw new Error("Name did not exist in state");
                            } 
                            setCurrentUser({
                                name: name as string,
                                title : title as string
                            }); 
                        }}>
                            <Heading fontSize={"2xl"} margin={"1em 0"}>Enter your job title</Heading>
                            <Input name ="title" placeholder='Title' isRequired defaultValue={currentUser?.title}/>
                            <Flex justifyContent={"flex-end"} margin="1em">

                            <Button variant="solid" colorScheme='blue' type="submit">Submit</Button>
                            </Flex>
                        </form>
                    </>}
                </Box>
            </ModalContent>
        </Modal>
    </>
}

export function WelcomeModal() {
   
    /**
     * In order to force a remount we use this wrapper/pattern 
     * Otherwise the modal will get stuck on the old step
     */
    const {currentUser, setCurrentUser, isEditing} = useCurrentUser();
    if(isEditing){
        return <WelcomeModalInner/>

    }
    return null;
}