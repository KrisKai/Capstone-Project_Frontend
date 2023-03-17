import { Paper, PaperProps, Typography } from '@mui/material';
import useLocales from 'hooks/useLocales';

// ----------------------------------------------------------------------


export default function SearchNotFound({ searchQuery = '', ...other }) {
  const { translate: t } = useLocales();

  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        {t('not_found')}
      </Typography>
      <Typography variant="body2" align="center">
        {t('No_results_found')} &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. {t('Try_checking')}
      </Typography>
    </Paper>
  );
}
