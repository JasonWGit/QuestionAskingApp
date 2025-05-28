import { createContext, useContext, useState } from 'react';

const LoginSessionContext = createContext(null);

export default function LoginSessionProvider({children}) {
    const [loginSession, setLoginSession] = useState(null);

    return (
        <LoginSessionContext.Provider value={{ loginSession, setLoginSession }}>
            {children}
        </LoginSessionContext.Provider>
    );
}

export function useLoginSession() {
    return useContext(LoginSessionContext);
}
