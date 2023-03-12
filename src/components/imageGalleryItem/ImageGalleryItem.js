import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/modal/Modal';
import {
  ImageGalleryListItem,
  ImageGalleryItemImage,
} from 'components/imageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <ImageGalleryListItem>
      <ImageGalleryItemImage
        onClick={toggleModal}
        src={webformatURL}
        alt={tags}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </ImageGalleryListItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

// export const Searchbar = ({ onSubmitForm, resetPage }) => {
//   return (
//     <SearchbarHeader>
//       <Formik
//         initialValues={{ searchQuary: '' }}
//         onSubmit={(values, actions) => {
//           const { searchQuary } = values;
//           resetPage = 1;

//           if (searchQuary.trim() === '') {
//             toast.error('Enter search query!', {
//               position: 'top-left',
//               autoClose: 2000,
//             });
//             return;
//           }

//           onSubmitForm(searchQuary, resetPage);
//           // actions.setSubmitting(false);
//           actions.resetForm();
//         }}
//       >
//         <SearchForm>
//           <SearchFormButton type="submit">
//             <GrFormSearch size={iconSize.m}></GrFormSearch>
//             <SearchFormButtonLabel></SearchFormButtonLabel>
//           </SearchFormButton>

//           <SearchFormInput
//             name="searchQuary"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </Formik>
//     </SearchbarHeader>
//   );
// };
