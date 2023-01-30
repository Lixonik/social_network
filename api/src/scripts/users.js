$(document).ready(() => {
    $(".btn-friends").click(function() { 
        window.location.href = `/users/${$(this).attr('data-id')}/friends`;
    });

    $(".btn-news").click(function() { 
        window.location.href = `/users/${$(this).attr('data-id')}/news`;
    });

    $(".btn-edit").click(function() {
        let user = {
            id: $(this).attr('data-id'),
            surname: $(this).parent().parent().parent().find('.surname input.form-control').val(),
            name: $(this).parent().parent().parent().find('.name input.form-control').val(),
            patronymic: $(this).parent().parent().parent().find('.patronymic input.form-control').val(),
            birthday: $(this).parent().parent().parent().find('.birthday input.form-control').val(),
            email: $(this).parent().parent().parent().find('.email input.form-control').val(),
            role: $(this).parent().parent().parent().find('select.form-control.role').val(),
            status: $(this).parent().parent().parent().find('select.form-control.status').val(),
        }

        $.ajax({
            url: "/users",
            method: 'PUT',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(user)
        });
    })
})