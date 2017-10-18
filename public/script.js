console.log('hello from the browser JavaScript')

document.addEventListener('DOMContentLoaded', function () {
  const elements = {
    trashIcon: function () {
      return document.querySelectorAll('.fa.fa-trash');
    },
    editProfileButton: function () {
      return document.querySelector('.edit-profile-button');
    },
    deleteButton: function () {
      return document.querySelector('.delete-button');
    },
    cancelButton: function () {
      return document.querySelector('.cancel-button');
    },
    userID: window.location.pathname.replace(/\/users\//),
    modal: function () {
      return document.querySelector('.modal');
    },
    modalOverlay: function () {
      return document.querySelector('.modal-overlay');
    },
    userImage: function () {
      return document.querySelector('.user-image');
    },
    userImageContainer: function () {
      return document.querySelector('.user-image-container');
    },
    submitProfileForm: function () {
      return document.querySelector('.submit-profile-form');
    },
    profilePicInput: function () {
      return document.querySelector('.profile-pic-input');
    },
  };

  const models = {
    deleteReview: function (reviewIDNumber) {
      fetch('/reviews', {
            method: 'delete',
            body: JSON.stringify({ reviewID: reviewIDNumber}),
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
          })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          let deletedReview = document.querySelector(`#${reviewIDNumber}`);
          deletedReview.parentElement.remove();
        }
      })
      .catch(error => console.error(error));
    },
    updateProfilePicture: function (profilePic) {
      fetch(`/users/${elements.userID}`, {
        method: 'put',
        body: JSON.stringify({ profilePic: profilePic }),
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          elements.userImage().src = profilePic;
        }
      })
      .catch(error => console.error(error));
    },
  };

  const views = {
    openDeleteModal: function () {
      elements.modalOverlay().display = 'flex';
      elements.modal().display = 'flex';
    },
    closeDeleteModal: function () {
      elements.modalOverlay().display = 'none';
      elements.modal().display = 'none';
    },
    appendInput: function () {
      let newInput = document.createElement('INPUT');
      newInput.setAttribute('type', 'text');
      newInput.classList.add('profile-pic-input');
      let newButton = document.createElement('BUTTON');
      newButton.classList.add('submit-profile-form');
      newButton.innerText = 'Submit';
      elements.userImageContainer().appendChild(newInput);
      elements.userImageContainer().appendChild(newButton);
    },
    removeInput: function () {
      elements.profilePicInput.display = 'none';
      elements.submitProfileForm.display = 'none';
    },
  };

  elements.trashIcon().forEach(function (icon) {
    icon.addEventListener('click', function () {
      views.openDeleteModal();
      let reviewID = icon.id;
      elements.deleteButton().id = reviewID;
    });
  });

  elements.cancelButton().addEventListener('click', views.closeDeleteModal());

  elements.editProfileButton().addEventListener('click', views.appendInput());

  elements.submitProfileForm().addEventListener('click', function () {
    let newProfilePic = elements.profilePicInput().value;
    models.updateProfilePicture(newProfilePic);
    views.removeInput();
  });

  elements.deleteButton().addEventListener('click', function () {
    let reviewID = elements.deleteButton().id;
    models.deleteReview(reviewID);
  });
});
