import { useNavigate, useLocation } from 'react-router-dom';

const useWithRouter = (Component) => {
  const WithRouterComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <Component navigate={navigate} location={location} {...props} />
    );
  };

  return WithRouterComponent;
};

export default useWithRouter;
