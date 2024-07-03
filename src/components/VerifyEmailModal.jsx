import React from "react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";



const VerifyEmailModal = ( props ) => {

    const { open, onClose, registerData } = props;

    const handleOpenEmailClient = () => {
        window.location.href = `mailto:${registerData.email}`;
    };

    return (
        <>
            <Modal 
            isOpen={open} 
            onClose={onClose}
            size='xl'
            placement='auto'
            scrollBehavior='inside'
            backdrop='blur'
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex items-center ">
                        <FontAwesomeIcon icon={faCoins} className="font-bold text-black dark:text-white"/>
                        <p className="font-bold text-black dark:text-white pl-2">MICROCASINO</p>
                    </ModalHeader>
                    <ModalBody>
                        <h2 className="font-bold">Verifica tu correo electrónico</h2>
                        <p> Consulta tu correo electrónico {registerData?.email && (<>{registerData.email} </>)} para verificar tu cuenta y sigue las instrucciones para poder empezar.</p>
                        <br />
                        <span>¿Necesitas ayuda? <Link href="/help" underline="hover">Visita la página de soporte</Link> o <Link href="/help" underline="hover">contáctanos</Link></span>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={onClose}>
                            Listo
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default VerifyEmailModal;