import React from 'react';
import { render } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen'; 

describe('RegisterScreen', () => {
  it('renderiza campos corretamente', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);
    
    expect(getByPlaceholderText('Nome completo')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByPlaceholderText('Confirme a senha')).toBeTruthy();
  });
});
