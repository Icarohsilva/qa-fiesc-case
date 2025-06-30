// File: backend/src/middlewares/validacao.js
import { body, query, validationResult } from 'express-validator';

// Função de tratamento de erros reutilizável
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validação para autenticação
export const validarLogin = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
    
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
    
  handleValidation
];

export const validarRegistro = [
  body('nome')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Nome deve ter pelo menos 3 caracteres'),
    
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
    
  body('senha')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres')
    .matches(/\d/)
    .withMessage('Senha deve conter pelo menos 1 número'),
    
  handleValidation
];

// Validação para ingredientes
export const validarTipoIngrediente = [
  query('tipo')
    .optional()
    .isIn(['BASE', 'ADICIONAL'])
    .withMessage('Tipo deve ser BASE ou ADICIONAL'),
    
  handleValidation
];

export const validarIngredientes = [
  body('ingredientesIds')
    .isArray({ min: 1 })
    .withMessage('Deve conter pelo menos 1 ingrediente')
    .custom(ids => ids.every(id => Number.isInteger(id)))
    .withMessage('IDs devem ser números inteiros'),
    
  handleValidation
];

// Validação para pedidos
export const validarPedido = [
  body('ingredientesBaseIds')
    .isArray({ min: 1 })
    .withMessage('Selecione pelo menos 1 ingrediente base'),
    
  body('ingredientesAdicionaisIds')
    .optional()
    .isArray({ max: 2 })
    .withMessage('Máximo de 2 ingredientes adicionais'),
    
  handleValidation
];


export const validarAtualizacaoPedido = [
  body('status')
    .isIn(['PREPARANDO', 'PRONTO', 'ENTREGUE', 'CANCELADO'])
    .withMessage('Status inválido'),
  (req, res, next) => {
    handleValidation(req, res, next);
  }
];

export const validarFiltroPedidos = [
  query('status')
    .optional()
    .isIn(['RECEBIDO', 'PREPARANDO', 'PRONTO', 'ENTREGUE', 'CANCELADO'])
    .withMessage('Status de filtro inválido'),
  query('dataInicio')
    .optional()
    .isISO8601()
    .withMessage('Data inicial inválida'),
  query('dataFim')
    .optional()
    .isISO8601()
    .withMessage('Data final inválida'),
  (req, res, next) => {
    handleValidation(req, res, next);
  }
];

export const validarIngredientesCafe = [
  body('ingredientesIds')
    .isArray({ min: 1 })
    .withMessage('Selecione pelo menos 1 ingrediente base'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];