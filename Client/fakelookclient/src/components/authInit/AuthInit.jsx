import { useEffect } from 'react'
import { connect } from 'react-redux'
import {refreshToken} from "../../actions"
import axios from 'axios';


const AuthInit = (props) => {
    useEffect(() => {

        setInterseptors();
    }, [props.accessToken])

    const setInterseptors = () => {
        axios.defaults.headers.common['authorization'] = props.accessToken;

        
    }
    axios.interceptors.response.use(response => {
        return response;
      }, err => {
        return new Promise((resolve, reject) => {
            const originalReq = err.config;
            if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
            {
                originalReq._retry = true;
      
                let res = fetch('http://localhost:4000/api/auth/token', {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: localStorage.getItem("refreshToken")
                    }),
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    props.refreshToken(res.accessToken)
                    originalReq.headers['Authorization'] = res.accessToken;
      
      
                    return axios(originalReq);
                });
      
      
                resolve(res);
            }
      
      
            return Promise.reject(err);
        });
      });

    return null
}

const mapStateToProps = ({login}) => {
    return{
        accessToken: login.accessToken
    }
}

export default connect(mapStateToProps,{refreshToken})(AuthInit)