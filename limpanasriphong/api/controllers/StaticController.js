/**
 * StaticController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 */

function generate_view(view, res) {
    if (!view) {
        view = 'index';
    }
    return res.view('static/'+view);
}

module.exports = {

    index: function(req, res) {
        //check for referral link
        if (req.param('r')) {
            var hash = req.param('r');
            var id = User.get_id_from_hash(hash);
            if (id && String(id).length) {
                User.findOneById(id).then(function(user) {
                    if (user) {
                        res.cookie('referral', {user_id: id}, {maxAge: 31536000});
                        return generate_view(req.route.path.replace('/', ''), res);
                    }
                });
            } else {
                return generate_view(req.route.path.replace('/', ''), res);
            }
        }
        else {
            return generate_view(req.route.path.replace('/', ''), res);
        }
    },

    contact_form: function(req, res) {
        if (req.method === 'POST') {

            if (req.param('name') && req.param('mail') && req.param('comment')) {

                //send email to admins
                EmailService.send(
                    'DevMountain Admin <admin@devmounta.in>',
                    'DevMountain Contact <cahlan@devmounta.in>',
                    'DevMountain Contact from '+req.param('name'),
                    'Name: '+req.param('name')+'\nEmail: '+req.param('mail')+'\nComment: '+req.param('comment')).then(function() {
                    req.session.flash = {message: "Your message was sent."}
                    res.redirect('/contact');
                });
            }
            else {
                req.session.flash = {message: "Fill out the fields correctly and try again"};
                res.redirect('/contact');
            }
        }
        else {
            res.redirect('/contact');
        }
    },

    employer_form: function(req, res) {
        if (req.method === 'POST') {

            if (req.param('name') && req.param('company_name') && req.param('mail') && req.param('comment')) {

                //send email to admins
                EmailService.send(
                    'DevMountain Admin <admin@devmounta.in>',
                    'DevMountain Contact <cahlan@devmounta.in>',
                    'DevMountain Employer Program',
                    'Name: '+req.param('name')+'\nCompany: '+req.param('company_name')+'\nEmail: '+req.param('mail')+'\nComment: '+req.param('comment')).then(function() {
                    req.session.flash = {message: "Thanks! We'll contact you soon."}
                    res.redirect('/employers');
                });
                EmailService.add_to_mailing_list(req.param('mail'), {FNAME:req.param('name')});
            }
            else {
                req.session.flash = {success: false, error: "Fill out the fields correctly and try again"};
                res.redirect('/employers');
            }
        }
        else {
            res.redirect('/employers');
        }
    },

    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to UserController)
    */
    _config: {}


};