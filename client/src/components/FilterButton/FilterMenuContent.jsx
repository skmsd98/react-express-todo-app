import {
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Button,
    MenuItem
} from '@mui/material';
import {
    useContext,
    useState
} from 'react';
import FilterContext from '../../context/FilterContext';

export default function FilterMenuContent({ handleFilter }) {
    const { filters } = useContext(FilterContext);

    const {
        priorities: defaultPriorities,
        groups: defaultGroups,
        startDate: defaultStartDate,
        endDate: defaultEndDate
    } = filters;

    const [priorities, setPriorities] = useState(defaultPriorities);
    const [groups, setGroups] = useState(defaultGroups);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);


    const handleChangePriorities = (e, id) => {
        const checked = e.target.checked;

        const updatedPriorities = priorities.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    checked
                }
            }
            return item;
        })

        setPriorities(updatedPriorities);
    }

    const handleChangeGroups = (e, id) => {
        const checked = e.target.checked;

        const updatedGroups = groups.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    checked
                }
            }
            return item;
        })

        setGroups(updatedGroups);
    }

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
    }

    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    }

    const handleSubmitForm = (e) => {
        handleFilter({
            priorities,
            groups,
            startDate,
            endDate
        })
    }

    return (
        <form>

            {/* Priorities */}

            <MenuItem disableRipple disableTouchRipple sx={{
                fontWeight: 'bold',
                borderBottom: '1px solid lightgray',
                justifyContent: 'center',
                '&:hover': {
                    background: 'none'
                }
            }}>
                Priority
            </MenuItem>
            {
                priorities && priorities.map(priority => (
                    <MenuItem key={priority.id} disableRipple>
                        <FormControlLabel
                            control={<Checkbox checked={priority.checked} />}
                            label={priority.value}
                            onChange={(e) => handleChangePriorities(e, priority.id)}
                        />
                    </MenuItem>
                ))
            }



            {/* Groups */}

            {
                groups && (
                    <MenuItem disableRipple disableTouchRipple sx={{
                        fontWeight: 'bold',
                        borderBottom: '1px solid lightgray',
                        justifyContent: 'center',
                        '&:hover': {
                            background: 'none'
                        }
                    }}>
                        Groups
                    </MenuItem>
                )
            }

            {
                groups && groups.map(group => (
                    <MenuItem key={group.id} disableRipple>
                        <FormControlLabel
                            control={<Checkbox checked={group.checked} />}
                            label={group.name}
                            onChange={(e) => handleChangeGroups(e, group.id)}
                        />
                    </MenuItem>
                ))
            }


            {/* Due Date */}

            <MenuItem disableRipple disableTouchRipple sx={{
                fontWeight: 'bold',
                borderBottom: '1px solid lightgray',
                justifyContent: 'center',
                '&:hover': {
                    background: 'none'
                }
            }}>
                Due Date
            </MenuItem>
            <MenuItem disableRipple sx={{ display: 'block' }}>
                <Typography>
                    From:
                </Typography>
                <TextField
                    id="date"
                    type="date"
                    value={startDate}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChangeStartDate}
                />
            </MenuItem>
            <MenuItem disableRipple sx={{ display: 'block' }}>
                <Typography>
                    To:
                </Typography>
                <TextField
                    id="date"
                    type="date"
                    value={endDate}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChangeEndDate}
                />
            </MenuItem>


            <MenuItem disableRipple>
                <Button
                    onClick={handleSubmitForm}
                    fullWidth
                    color='error'
                    variant='contained'
                >
                    Done
                </Button>
            </MenuItem>
        </form>
    )
}