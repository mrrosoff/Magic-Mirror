import React, {useEffect, useState} from 'react';

import {Grid} from '@material-ui/core';

import {post} from '../../hooks/useAPI';

const AdminCard = props =>
{
	const [accounts, setAccounts] = useState();

	useEffect(() =>
	{
		post("getPendingAccounts")
		.then(r =>
		{
			setAccounts(r.data.userData);
		})
	}, []);

	return(
		<Grid container direction={"column"} spacing={2}>
			{
				accounts ?
					accounts.map((item, index) =>
						<Grid item key={index}>
							{item.username}
						</Grid>
					) : null
			}
		</Grid>
	)
}

export default AdminCard;
