import React from 'react'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Container } from '@mui/material'

const supabase = createClient(process.env.REACT_APP_API_SUPABASE_URL,
    process.env.REACT_APP_API_SUPABASE_SECRET_KEY
)

const Login = () => {

  
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (<Box sx={{ backgroundColor: 'black', width: '100%', height: '45em' }} display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh" >
            <Box width={'30em'} justifyItems={'center'} alignItems={'center'}>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={["google"]} />
            </Box>
        </Box>)
    }
    else {
        return (<div>
            <span>
                Logged in!
            </span>
            <Link to={'/'}>Back to home</Link>
        </div>)
    }

}

export default Login