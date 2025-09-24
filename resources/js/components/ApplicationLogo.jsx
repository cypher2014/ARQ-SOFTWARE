import Logo from '../../../public/logo.png';

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
