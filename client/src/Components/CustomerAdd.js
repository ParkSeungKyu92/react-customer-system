import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden : {
        display :'none'
    }
})

class CustomerAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName  : '',
            open : false //dialog open 상태
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
    }

    handleClickOpen() {
        this.setState({
            open : true
        });
    }

    handleClickClose() {
        this.setState({
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName  : '',
            open : false
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.addCustomer()
            .then(function(response) {
                console.log(response.data);
                this.props.updateCustomer();
            }.bind(this));
            
        this.setState({
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName  : '',
            open : false
        });
        //window.location.reload();
    }

    addCustomer(e) {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('fileName', this.state.fileName);
        formData.append('userName', this.state.userName);
        formData.append('birth', this.state.birth);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        //전송할 데이터에 파일이 있을경우
        const config = {
            headers : {
                'context-type' : 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleFileChange(e) {
        e.preventDefault();
        this.setState({
            file : e.target.files[0],
            fileName : e.target.value
        });
    }

    handleValueChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        const {classes} = this.props;
        return(
            <div>
                <Button variant="contained" color='primary' onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>  
                        <TextField label="이름" type='text' name='userName' value={this.state.userName} onChange={this.handleValueChange}></TextField><br/>
                        <TextField label="생년월일" type='text' name='birth' value={this.state.birth} onChange={this.handleValueChange}></TextField><br/>
                        <TextField label="성별" type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange}></TextField><br/>
                        <TextField label="직업" type='text' name='job' value={this.state.job} onChange={this.handleValueChange}></TextField><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
                            추가
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);