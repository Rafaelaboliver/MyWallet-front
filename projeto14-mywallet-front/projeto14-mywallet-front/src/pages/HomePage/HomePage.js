import { Link } from "react-router-dom";
import { Bottom, CheckIn, CheckOut, DataContainer, HomeContainer, Title, DescriptionContainer, Day, Item, Value, TotalContainer } from "./HomePageCss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { apiWallet } from "../../services/apiWallet";


export default function HomePage() {
    const { user } = useContext(UserContext);
    const [userWallet, setUserWallet] = useState({
        coming: [],
        balance: 0,
    });

    function getWalletList() {
        apiWallet
            .getWallet(user.token)
            .then((res) => {
                console.log("Resposta do Servidor:", res.data);
                setUserWallet(res.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    }

    useEffect(getWalletList, [user.token]);
    console.log(userWallet.coming);

    //let userComing = userWallet.coming;

    return (
        <HomeContainer>
            <Title>
                <h1>Olá, Fulano</h1>
                <Link to='/'>
                    <ion-icon name="log-out-outline"></ion-icon>
                </Link>

            </Title>

            <DataContainer>
                {userWallet.coming.length === 0 ? (
                    <p>
                        Não há registros de entrada ou saída
                    </p>
                ) : (
                    //aqui iriei fazer o map da variável initialMessage (setInitialMessage vai receber os dados do servidor):
                    <>

                        {userWallet.coming.map((item, index) => (
                            <DescriptionContainer key={index} >
                                <Day>{item.date}</Day>
                                <Item>{item.description}</Item>
                                <Value type={item.type}>{item.value}</Value>
                            </DescriptionContainer>
                        ))}


                        <TotalContainer>
                            {userWallet.balance}
                        </TotalContainer>
                    </>
                )
                }
            </DataContainer>

            <Bottom>
                <Link to='/nova-entrada'>
                    <CheckIn>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <h3>Nova entrada</h3>
                    </CheckIn>
                </Link>

                <Link to='/nova-saida'>

                    <CheckOut >
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <h3>Nova saída</h3>
                    </CheckOut>
                </Link>
            </Bottom>
        </HomeContainer>
    )
}