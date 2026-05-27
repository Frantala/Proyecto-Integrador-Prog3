import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importamos la librería que decodifica

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Buscamos el token en el localStorage
        const token = localStorage.getItem('token');

        if (token) {
            try {
                // 2. Si hay token, lo decodificamos para ver el { id, email, role }
                const decodedUser = jwtDecode(token);
                
                // 3. Guardamos esos datos en el estado global
                setUser(decodedUser);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                // Si el token es inválido o fue modificado, lo borramos por seguridad
                localStorage.removeItem('token');
            }
        }
        
        // 4. Avisamos que ya terminamos de cargar, haya o no haya usuario
        setIsLoading(false);
    }, []); // <- ¡Acá está tu array vacío!

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};