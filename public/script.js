console.log('hello from the browser JavaScript')

document.addEventListener('DOMContentLoaded', function () {
  const elements = {
    trashIcon: function () {
      return document.querySelectorAll('.fa fa-trash')
    },
    profileButton: function () {
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
          event.target.parentElement.remove();
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
          // call ui function here
          alert('It worked')
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
  };

  elements.trashIcon().forEach(function (icon) {
    icon.addEventListener('click', views.openDeleteModal());
  });

  elements.cancelButton().addEventListener('click', views.closeDeleteModal());
});
