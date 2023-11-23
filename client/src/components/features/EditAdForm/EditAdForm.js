import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Progress } from 'reactstrap';

import { editAdRequest, getAdById } from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';

const EditAdForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const ad = useSelector((state) => getAdById(state, id));

    const handleSubmit = (ad) => {
        dispatch(editAdRequest(ad, id));
        setTimeout(() => {
            return navigate('/');
        }, 1000);
    };
    if (!ad) {
        return <Progress animated color='success' value={50} />;
    }

    return (
        <AdForm
            action={handleSubmit}
            actionText='Edit Ad'
            title={ad.title}
            localization={ad.localization}
            content={ad.content}
            price={ad.price}
            publicationDate={ad.publicationDate}
            photo={ad.photo}
            _id={ad._id}
        />
    );
};

export default EditAdForm;