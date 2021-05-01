import { Fragment } from "react";

const SignupSecondStep = ({back_to_step1, set_register_form_method, register, registerForm}) => {
    return ( 
        <Fragment>
            <h1>Ask</h1>
                <p>Fill up the forms to sign up</p>
                <form onSubmit={register}>
                    <label>
                        
                        <input type='text' 
                            placeholder=' ' 
                            required 
                            name='first_name'
                            value={registerForm.first_name}
                            onChange={set_register_form_method}/>
                        <p>First Name</p>
                    </label>
                    <label>
                        
                        <input type='text'
                            placeholder=' ' 
                            required  
                            name='last_name'  
                            value={registerForm.last_name}
                            onChange={set_register_form_method}/>
                        <p>Last Name</p>
                    </label>
                    <label>
                        
                        <input type='text'
                            placeholder=' ' 
                            required  
                            name='username'  
                            value={registerForm.username}
                            onChange={set_register_form_method}/>
                        <p>Username</p>
                    </label>
                    <label>
                        <input 
                            type='password' 
                            autoComplete='off' 
                            required 
                            placeholder=' ' 
                            name='password' 
                            onChange={set_register_form_method}/>
                        <p>Password</p>
                    </label>
                    <input type='submit' value='sign up' />

                </form>
                <div className='back_step' onClick={back_to_step1}>
                    <i className='fa fa-angle-left'></i>
                    <p>go back to step 1</p>
                </div>
        </Fragment>
     );
}
 
export default SignupSecondStep;