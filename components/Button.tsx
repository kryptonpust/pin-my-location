import { Button as ButtonTamagui, styled } from 'tamagui';

export const Button = styled(ButtonTamagui, {
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
});
