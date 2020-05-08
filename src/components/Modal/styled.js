import styled, { css } from 'styled-components'
import tw from 'tailwind.macro'

export const ModalWrapper = styled.div(
   () => css`
      background: rgba(0, 0, 0, 0.2);
      ${tw`fixed inset-0 flex items-center justify-center`}
   `
)

export const ModalCard = styled.div(
   () => css`
      width: 720px;
      height: auto;
      ${tw`bg-white rounded p-3`}
   `
)
