
import React, {Component} from 'react';
import axios from 'axios';
import HEADER from "./HEADER";
import moment from "moment";
import Moment from 'react-moment'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {Form} from "react-bootstrap";


const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
});

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            file: null,
            loading: true,
            title: '',
            type: '',
            company: '',
            location: '',
            isActual: false,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: null,
            description: '',
            picture: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    tick()
    {
        this.setState({isActual:!this.state.isActual});
    }
    handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addExperience()
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get(`/api/experiences`).then(res => {
            const posts = res.data;
            this.setState({ posts, loading: false })
        })
    }
    addExperience() {
        const setState = this.setState.bind(this)
        const getPosts = this.getPosts.bind(this)
        setState({ loading: true })
        const experience = new FormData();
        experience.set("title", this.state.title);
        experience.set("type", this.state.type);
        experience.set("company", this.state.company);
        experience.set("location", this.state.location);
        experience.set("is_actual", this.state.isActual);
        experience.set("start_date", this.state.startDate);
        experience.set("end_date", this.state.endDate);
        experience.set("description", this.state.description);
        experience.set("picture", this.state.picture);
        axios({
            method: "post",
            url: '/api/experience',
            data: experience
        })
            .then(function (response){
                //On traite la suite une fois la réponse obtenue
                console.log(response);
                getPosts();
                setState({ loading: false });

            })
            .catch(function (error){
                //On traite ici les erreurs éventuellement survenues
                console.log(error);
            })
    }

    render() {
        const { classes } = this.props;
        const loading = this.state.loading;
        Moment.globalFilter = (d) => {
            return d.charAt(0).toUpperCase() + d.slice(1);
        };
        const typeWork = [
            {name: ''},
            {name: 'Temps plein'},
            {name: 'Temps partiel'},
            {name: 'Indépendant'},
            {name: 'Freelance'},
            {name: 'CDD'},
            {name: 'Stage'},
            {name: 'Contat en alternance'},
        ];
        return (
            <div>
                <HEADER title={'Posts - Julien MOULIN'}/>
                <section className="row-section">
                    <div className="container">
                        <div className="row">
                            <h2 className="text-center"><span>Expériences</span></h2>
                        </div>

                        {loading ? (
                            <div className={'row text-center'}>
                                <span className="fa fa-spin fa-spinner fa-4x"/>
                            </div>

                        ) : (
                            <div className={'row'}>
                                <div className="col-md-10 offset-md-1 row-block">
                                    <div className="media">
                                        <div className="media-body">
                                            <Form onSubmit={this.handleSubmit} className={'form-add'}
                                                  style={{ width: '100%' }}>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <TextField
                                                        label={'Intitulé du poste'}
                                                        id={'title'}
                                                        name={'title'}
                                                        className={'input'}
                                                        type={'text'}
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        variant="outlined"
                                                        required
                                                    />
                                                    <InputLabel id="typeLabel"
                                                                style={{ marginTop: 75 }}>Type de contrat</InputLabel>
                                                    <Select
                                                        labelId="typeLabel"
                                                        id={'type'}
                                                        name={'type'}
                                                        className={'input'}
                                                        value={this.state.type}
                                                        onChange={this.handleChange}
                                                        style={{ marginTop: 20 }}
                                                        label={'Type de contrat'}
                                                        required>
                                                        {typeWork.map((value, index) =>
                                                            (index !== 0 ? <MenuItem key={index} value={index}>{value.name}</MenuItem> : <MenuItem key={index} value={''}> - </MenuItem>)
                                                        )}
                                                    </Select>
                                                    <TextField
                                                        label={'Entreprise'}
                                                        id={'company'}
                                                        name={'company'}
                                                        className={'input'}
                                                        type={'text'}
                                                        onChange={this.handleChange}
                                                        variant="outlined"
                                                        style={{ marginTop: 20 }}
                                                        required
                                                    />
                                                    <TextField
                                                        label={'Lieu'}
                                                        id={'location'}
                                                        name={'location'}
                                                        className={'input'}
                                                        type={'text'}
                                                        onChange={this.handleChange}
                                                        variant="outlined"
                                                        style={{ marginTop: 20 }}
                                                        required
                                                    />
                                                    <div className={'isActual flexRow'}>
                                                        <FormControlLabel
                                                            control={<Checkbox
                                                                id={'isActual'}
                                                                name={'isActual'}
                                                                className={'input'}
                                                                onChange={this.tick.bind(this)}
                                                                checked={this.state.isActual}
                                                            />}
                                                            label={'J\'occupe actuellement ce poste '}
                                                            style={{ marginTop: 20 }}/>
                                                    </div>
                                                    <div className={'dates flexRow input'}>
                                                        <TextField
                                                            id={'startDate'}
                                                            name={'startDate'}
                                                            className={'input'}
                                                            label={'Date de début'}
                                                            placeholder={'Date de début'}
                                                            type={'date'}
                                                            defaultValue={null}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            onChange={this.handleChange}
                                                            variant="outlined"
                                                            style={{ marginTop: 20 }}
                                                            required
                                                        />
                                                        <TextField
                                                            id={'endDate'}
                                                            name={'endDate'}
                                                            className={'input'}
                                                            label={'Date de fin'}
                                                            placeholder={'Date de fin'}
                                                            type={'date'}
                                                            defaultValue={null}
                                                            InputLabelProps={{
                                                                shrink: true,

                                                            }}
                                                            onChange={this.handleChange}
                                                            variant="outlined"
                                                            style={{ marginTop: 20 }}
                                                            hidden={this.state.isActual}
                                                        />
                                                        <TextField
                                                            id={'endDate'}
                                                            name={'endDate'}
                                                            className={'input'}
                                                            label={'Date de fin'}
                                                            placeholder={'Date de fin'}
                                                            type={'text'}
                                                            variant="outlined"
                                                            style={{ marginTop: 20 }}
                                                            value={'Aujourd\'hui'}
                                                            hidden={!this.state.isActual}
                                                            disabled
                                                        />
                                                    </div>
                                                    <TextField
                                                        id={'description'}
                                                        name={'description'}
                                                        className={'input'}
                                                        label={'Description'}
                                                        multiline
                                                        rows={5}
                                                        defaultValue={''}
                                                        onChange={this.handleChange}
                                                        variant="outlined"
                                                        style={{ marginTop: 20 }}
                                                    />
                                                    <Button type={"submit"}
                                                            variant="contained"
                                                            color="secondary"
                                                            style={{ marginTop: 20 }}>
                                                        Ajouter
                                                    </Button>
                                                </FormControl>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                {this.state.posts.map(post =>
                                    <div className="col-md-10 offset-md-1 row-block" key={post.id}>
                                        <ul id="sortable">
                                            <li>
                                                <div className="media">
                                                    <div className="media-body">
                                                        <h4>{post.title ? post.title : ''}</h4>
                                                        <p>{post.type ? typeWork[post.type].name : ''}</p>
                                                        <p>{post.company ? post.company : ''}</p>
                                                        <p>{post.location ? post.location : ''}</p>
                                                        <p>{post.startDate ? <Moment locale="fr" unix format="MMMM YYYY">{post.startDate.timestamp}</Moment> : ''}</p>
                                                        <p>{post.endDate ? <Moment locale="fr" unix format="MMMM YYYY">{post.endDate.timestamp}</Moment> : 'Aujourd\'hui'}</p>
                                                        <p>{post.description ? post.description : ''}</p>
                                                        <p>{post.picture ? post.picture : ''}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Posts);