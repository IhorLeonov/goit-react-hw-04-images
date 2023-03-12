import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { GlobalStyle } from 'components/constants/GlobalStyle';
import { Searchbar } from 'components/searchbar/Searchbar';
import { ImageGallery } from 'components/imageGallery/ImageGallery';
import { Button } from 'components/button/Button';
import { ImageFinder } from 'components/app/App.styled';
import { Loader } from 'components/loader/Loader';
import * as API from 'components/services/pixabayAPI';

export const App = () => {
  const [data, setData] = useState([]);
  const [quary, setQuary] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  const fetchImages = async (newQuary, newPage) => {
    try {
      if (newPage === 1 && newQuary === quary) {
        return;
      }
      setShowLoader(true);

      if (quary !== newQuary) {
        setQuary(newQuary);
        setPage(newPage);
        setData([]);
      }

      const newData = await API.getRequest(newQuary, newPage);
      setShowLoader(false);

      if (!newData.totalHits) {
        return setStatus('empty');
      }
      setPage(prevState => prevState + 1);
      setData(prevState => [...prevState, ...newData.hits]);
      setTotalHits(newData.totalHits);
      setStatus('resolved');

      if (page !== 1) {
        handleSroll();
      }
    } catch (error) {
      console.log(error.message);
      setError(error);
      setStatus('rejected');
      setShowLoader(false);
    }
  };

  const handleSroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: 400,
        behavior: 'smooth',
      });
    }, 100);
  };

  return (
    <ImageFinder>
      <Searchbar onSubmitForm={fetchImages} resetPage={page}></Searchbar>
      <ImageGallery data={data} status={status} quary={quary} error={error} />
      {data.length > 0 &&
        totalHits > data.length &&
        status === 'resolved' &&
        !showLoader && (
          <Button status={status} onClick={() => fetchImages(quary, page)} />
        )}
      {showLoader && <Loader page={page} width={96} />}
      <GlobalStyle />
      <ToastContainer />
    </ImageFinder>
  );
};

// export class App extends Component {
//   state = {
//     data: [],
//     quary: '',
//     status: 'idle',
//     error: null,
//     page: 1,
//     totalHits: 0,
//     showLoader: false,
//   };

//   fetchImages = async (newQuary, newPage) => {
//     try {
//       const { quary } = this.state;

//       if (newPage === 1 && quary === newQuary) {
//         return;
//       }

//       this.setState({ showLoader: true });

//       if (quary !== newQuary) {
//         this.setState({
//           quary: newQuary,
//           page: newPage,
//           data: [],
//           status: 'pending',
//         });
//       }

//       const newData = await API.getRequest(newQuary, newPage);
//       this.setState({ showLoader: false });

//       if (!newData.totalHits) {
//         return this.setState({ status: 'empty' });
//       }

//       this.setState(prevState => ({
//         page: prevState.page + 1,
//         data: [...prevState.data, ...newData.hits],
//         totalHits: newData.totalHits,
//         status: 'resolved',
//       }));
//     } catch (error) {
//       console.log(error.message);
//       this.setState({ error, status: 'rejected' });
//     }
//   };

//   handleInputChange = e => {
//     this.setState({ inputValue: e.currentTarget.value });
//   };

//   render() {
//     const { data, status, quary, error, totalHits, page, showLoader } =
//       this.state;

//     return (
//       <ImageFinder>
//         <Searchbar
//           onChange={this.handleInputChange}
//           onSubmitForm={this.fetchImages}
//           resetPage={page}
//         ></Searchbar>
//         <ImageGallery data={data} status={status} quary={quary} error={error} />
//         {data.length > 0 &&
//           totalHits > data.length &&
//           status === 'resolved' &&
//           !this.state.showLoader && (
//             <Button
//               status={status}
//               onClick={() => this.fetchImages(quary, page)}
//             />
//           )}
//         {showLoader && <Loader page={page} width={96} />}
//         <GlobalStyle />
//         <ToastContainer />
//       </ImageFinder>
//     );
//   }
// }
