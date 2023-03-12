import { Button, Link as MUILink, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getArticles, postArticle } from '../api/routes';
import { humanizeDate } from '../utils/date';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CreateArticle from '../components/CreateArticle';
import { useNavigate } from 'react-router';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isCreate, setCreate] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getArticles()
      .then((resp) => {
        setArticles(resp.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreateArticle = (values) => {
    postArticle({ title: values.title }).then((resp) => {
      navigate(`/article/${resp.id}/edit`);
    });
  };

  return (
    <Stack direction="column" gap={4}>
      {isLoading && 'Loading...'}
      {user?.id ? (
        isCreate ? (
          <CreateArticle handleSubmit={handleCreateArticle} handleCancel={() => setCreate(false)} />
        ) : (
          <Button
            id="add-button"
            size="large"
            variant="contained"
            onClick={() => setCreate(true)}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <span style={{ fontSize: 20, marginRight: 10, position: 'relative', top: -1 }}>+</span>
            Create article
          </Button>
        )
      ) : null}
      {articles.map((a) => (
        <MUILink
          component={Link}
          to={`/article/${a.id}`}
          key={a.id}
          sx={{ textDecoration: 'none' }}
        >
          <Typography variant="h4">{a.title}</Typography>
          <Typography variant="caption">{humanizeDate(a.created_at)}</Typography>
        </MUILink>
      ))}
    </Stack>
  );
};

export default ArticlesList;
