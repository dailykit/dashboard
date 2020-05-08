import React from 'react'
import usePortal from 'react-useportal'
import { ModalWrapper, ModalCard } from './styled'

export const Modal = ({ children }) => {
   const { Portal } = usePortal({
      bindTo: document && document.getElementById('modal'),
   })
   return (
      <Portal>
         <ModalWrapper>
            <ModalCard>{children}</ModalCard>
         </ModalWrapper>
      </Portal>
   )
}
