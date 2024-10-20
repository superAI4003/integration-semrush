import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { regionsDatabase } from '../constants/regionsDatabase';
import { FC, useState } from 'react';
import { LoadingButton } from '@mui/lab';

type Props = Readonly<{
    onSubmit: (region: string) => void;
    isLoading: boolean;
    isDisabled: boolean;
}>;

export const EvaluationInputs: FC<Props> = props => {
  const [selectedRegion, setSelectedRegion] = useState('');

  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <FormControl
        size="small"
        sx={{ width: '300px' }}
      >
        <InputLabel id="region-select-label">Region</InputLabel>
        <Select
          labelId="region-select-label"
          value={selectedRegion}
          onChange={event => setSelectedRegion(event.target.value)}
          label="Region"
          size="small"
        >
          {regionsDatabase.map(region => <MenuItem value={region.id} key={region.id}>{region.name}</MenuItem>)}
        </Select>
      </FormControl>
      <LoadingButton
        size="small"
        variant="contained"
        onClick={() => props.onSubmit(selectedRegion)}
        disabled={selectedRegion === '' || props.isDisabled}
        loading={props.isLoading}
      >
        Evaluate
      </LoadingButton>
    </Stack>
  );
};

EvaluationInputs.displayName = 'EvaluationInputs';
