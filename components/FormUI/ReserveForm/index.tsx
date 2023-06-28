import React, { useEffect, useState } from 'react';
import { Box, Button, Collapse, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarPicker, CalendarPickerSkeleton, PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useController, UseControllerProps } from 'react-hook-form';
import { ReservationTime } from 'fe-modules/models/FormUI/FormUIData';

const CustomPickersDay = styled(PickersDay)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '900',
}));

interface FormProps extends UseControllerProps {
  times: ReservationTime;
}

const ReserveForm = ({ name, control, rules, times }: FormProps) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules,
  });

  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    if (date && time) {
      field.onChange({ date, time });
    }
  }, [time]);

  return (
    <Box sx={{ width: '100%', mt: 2, mb: 4 }}>
      {!times ? (
        <CalendarPickerSkeleton />
      ) : (
        <>
          <Typography variant="subtitle2" mb={1}>
            {'예약폼.타이틀'}
          </Typography>
          <CalendarPicker
            disablePast
            date={dayjs(date)}
            onChange={(newDate) => setDate(newDate!.format('YYYY-MM-DD'))}
            shouldDisableDate={(cur) => !Object.keys(times).includes(cur.format('YYYY-MM-DD'))}
            //@ts-ignore
            renderDay={(day, selectedDays, props) => <CustomPickersDay {...props} />}
          />
          <Collapse in={!!date}>
            {!!date && times[date] && (
              <Grid container columns={{ xs: 4, sm: 6 }} spacing={2} px={3}>
                {times[date][0]
                  .sort((a, b) => {
                    if (a.reservationTime < b.reservationTime) {
                      return -1;
                    } else if (a.reservationTime == b.reservationTime) {
                      return 0;
                    } else {
                      return 1;
                    }
                  })
                  .map((selectedDate, index) => (
                    <Grid item xs={2} key={index}>
                      <Button
                        variant={selectedDate.reservationTime === time ? 'contained' : 'outlined'}
                        disabled={!selectedDate.available}
                        fullWidth
                        onClick={() => setTime(selectedDate.reservationTime)}
                      >
                        {selectedDate.reservationTime}
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            )}
          </Collapse>
        </>
      )}
    </Box>
  );
};

export default ReserveForm;
