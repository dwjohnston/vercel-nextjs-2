
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
    Button
} from '@chakra-ui/react';
import Head from 'next/head';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { useState } from 'react';



const steps = [
    { title: 'Name', description: 'Enter your name' },
    { title: 'Job Title', description: 'Enter your job title' },
]

export function WelcomeModal() {

    const[currentUser, setCurrentUser] = useCurrentUser();

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    const [name, setName] = useState(null as null | string); 

    console.log(currentUser);

    if (currentUser) {
        return null; 
    }

    

    return <>
        <Modal
            isOpen
            onClose={() => {

            }}

        >
            <ModalHeader>Welcome</ModalHeader>
            <ModalContent>
                <Box>
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
                        <Heading>Enter your name</Heading>
                        <Input name ="name" placeholder='Name' isRequired/>
                        <Button variant="solid" colorScheme='blue' type="submit">Next</Button>
                        </form>
                    </>}
                    {activeStep === 2 && <>
                        <form onSubmit={(e) =>{
                            e.preventDefault();

                            const title = new FormData(e.currentTarget).get("title");
                            if(!title){
                                throw new Error("Title did not exist in form");
                            }      
                            setCurrentUser({
                                name: name, 
                                title
                            }); 
                        }}>
                            <Heading>Enter your job title</Heading>
                            <Input name ="title" placeholder='Title' isRequired/>
                            <Button variant="solid" colorScheme='blue' type="submit">Submit</Button>
                        </form>
                    </>}
                </Box>
            </ModalContent>
        </Modal>
    </>
}