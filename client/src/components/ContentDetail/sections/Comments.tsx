import React from 'react'
import { useComments } from '@hooks/comments/useComments'

import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useAppSelector } from '@redux/hooks'

type Comment = {
    contentID: string,
}

export const Comments: React.FC<Comment> = (props) => {
    const classes = useStyles();
    const userID = useAppSelector(state => state.auth.userID);
    const contentID = props.contentID;
    const { comments, onDeleteComment } = useComments(contentID);

    return (
        <>
            <h3 style={{ marginLeft: '20px' }}>댓글</h3>
            {comments.map(comment => (
                <ListItem >
                    <Card className={classes.commentsSection}>
                        <CardContent>
                            <Typography variant="body1" component="p">
                                {comment.comment}
                            </Typography>
                            <Typography variant="body2" component="p">
                                작성자: {comment.userID}
                            </Typography>
                        </CardContent>
                        {
                            comment.userID === userID
                            &&
                            <CardActions>
                                <Button onClick={() => onDeleteComment(comment._id)} color="secondary">삭제</Button>
                            </CardActions>
                        }
                    </Card>
                </ListItem>
            ))}
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        commentsSection: {
            width: '100%',
            height: '20%',
        }
    })
)