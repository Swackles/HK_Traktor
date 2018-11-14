function login() {
    swal({
        title: "Logi sisse",
        content: {
            element: "input",
            attributes: {
                placeholder: "kasutajanimi",
            }
        },
        buttons: {
            confirm: "submit",
            cancel: "cancel"
        }
    }).then(username => {
        swal({
            title: "Logi sisse",
            content: {
                element: "input",
                attributes: {
                    placeholder: "parool",
                    type: "password",
                }
            },
            buttons: {
                confirm: "submit",
                cancel: "cancel"
            }
        }).then(password => {

            $.ajax({
                url: '/traktor/login',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    username: username,
                    password: password 
                }),
                statusCode: {
                    200: () => {
                        swal({
                            title: "Success",
                            icon: "success",
                            buttons: {
                                confirm: true
                            }
                        });
                    },
                    401: () => {
                        swal({
                            title: "Vale parool või kasutajanimi",
                            icon: "error",
                            buttons: {
                                cancel: true
                            }
                        });
                    }
                }
            });
        });
    });
}
