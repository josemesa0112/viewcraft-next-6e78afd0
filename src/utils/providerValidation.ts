export interface ValidationResult {
  isValid: boolean;
  errorType?: 
    | "invalid-name"
    | "invalid-nit"
    | "nit-exists"
    | "invalid-email"
    | "invalid-phone"
    | "invalid-address";
}

export interface Provider {
  id: string;
  nombre: string;
  nit: string;
  email: string;
  telefono: string;
  direccion: string;
  createdAt: string;
}

// Validar nombre: solo letras, espacios y signos diacríticos
export function validateName(name: string): ValidationResult {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  if (!name.trim() || !nameRegex.test(name)) {
    return { isValid: false, errorType: "invalid-name" };
  }
  return { isValid: true };
}

// Validar NIT: solo números
export function validateNIT(nit: string): ValidationResult {
  const nitRegex = /^\d+$/;
  if (!nit.trim() || !nitRegex.test(nit)) {
    return { isValid: false, errorType: "invalid-nit" };
  }
  return { isValid: true };
}

// Validar email: formato válido con caracteres especiales permitidos
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.trim() || !emailRegex.test(email)) {
    return { isValid: false, errorType: "invalid-email" };
  }
  return { isValid: true };
}

// Validar teléfono: solo números
export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^\d+$/;
  if (!phone.trim() || !phoneRegex.test(phone)) {
    return { isValid: false, errorType: "invalid-phone" };
  }
  return { isValid: true };
}

// Validar dirección: campo obligatorio
export function validateAddress(address: string): ValidationResult {
  if (!address.trim()) {
    return { isValid: false, errorType: "invalid-address" };
  }
  return { isValid: true };
}

// Verificar si el NIT ya existe
export function checkNITExists(nit: string): boolean {
  const providers = getProviders();
  return providers.some(provider => provider.nit === nit);
}

// Obtener proveedores del localStorage
export function getProviders(): Provider[] {
  const stored = localStorage.getItem("proveedores");
  return stored ? JSON.parse(stored) : [];
}

// Guardar proveedor en localStorage
export function saveProvider(provider: Omit<Provider, "id" | "createdAt">): Provider {
  const providers = getProviders();
  const newProvider: Provider = {
    ...provider,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  providers.push(newProvider);
  localStorage.setItem("proveedores", JSON.stringify(providers));
  return newProvider;
}
