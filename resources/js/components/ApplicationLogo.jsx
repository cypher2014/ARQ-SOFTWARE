import Logo from '../../../public/logo.svg';

export default function ApplicationLogo(props) {
    return (
        <img 
            src={Logo} 
            alt="Logo" 
            className="h-12 w-auto" 
            {...props} 
        />
    );
}
