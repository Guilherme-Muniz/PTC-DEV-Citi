import { Request, Response } from 'express';
import prisma from "@database";
import CalcadosRepositorie from '../repositorie/CalcadosRepositorie';

class CalcadosController
{
    async create(request:Request,response:Response)  
    {
        try 
        {
            const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = request.body; 
            const novoCalcado = await prisma.calcado.create(
            {
                data: 
                {
                    nome_produto,
                    cor,
                    marca,
                    tamanho,
                    preco,
                    quantidade_em_estoque
                }
            });
            return response.status(200).json(novoCalcado); 
        } 
        catch (error) 
        {
            return response.status(400).json({
                message: "Erro ao cadastrar calçado",
                error
            });
        }

    }

    async read(request:Request,response:Response)
    {
        try
        {
            const todosCalcados = await prisma.calcado.findMany();

            if (todosCalcados.length === 0) // checa se não ta vazio
            {
                return response.status(404).json({ message: "Nenhum calçado encontrado no estoque." });
            }

            return response.status(200).json(todosCalcados);
        }
        catch (error)
        {
            return response.status(400).json({
                message: "Erro ao tentar encontrar informação",
                error
            });
        }
    }

    async update(request:Request,response:Response)
    {
        try
        {
            const { id } = request.params;
            const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = request.body;
            const calcadoAtualizado = await prisma.calcado.update(
            {
                where:
                { 
                    id: Number(id)
                },
                data:
                {
                    nome_produto,
                    cor,
                    marca,
                    tamanho,
                    preco,
                    quantidade_em_estoque
                }
            });

            return response.status(200).json(calcadoAtualizado);

        }
        catch (error) 
        {
            return response.status(400).json({
                message: "Erro ao tentar atualizar informação",
                error
            });    
        }
    }

    async deleteCalcados(request:Request,response:Response) // tive que colocar deleteCalcados em vez de delete porque ja existe uma função delete
    {
        try
        {
            const { id } = request.params;

            await prisma.calcado.delete(
            {
                where:
                {
                    id: Number(id)
                }
            });
            return response.status(200).json("Deletado com sucesso")
        } 
        catch (error) 
        {
            return response.status(400).json({
            message: "Erro ao tentar deletar calçado",
            error
            });   
        }
    }

    async buscarPorTamanho(request: Request, response: Response)
    {
        try
        {
            const { tamanho } = request.params;
            const calcados = await CalcadosRepositorie.BuscarPorTamanho(Number(tamanho));
            if (calcados.length === 0)
            {
                return response.status(200).json({ message: "Nenhum calçado encontrado com este tamanho." });
            }

            return response.status(200).json(calcados);
        }
        catch (error)
        {
            return response.status(400).json({
            message: "Erro ao buscar produto",
            error
            });
        }
    }

    async buscarPorMarca(request: Request, response: Response)
    {
        try 
        {
            const { marca } = request.params;
            const calcados = await CalcadosRepositorie.BuscarPorMarca(marca);
        
            if (calcados.length === 0)
            {
                return response.status(200).json({ message: "Nenhuma marca encontrada." });
            }
        
            return response.status(200).json(calcados);
        } 
        catch (error) 
        {
            return response.status(400).json({
            message: "Erro ao buscar produto",
            error
            });
        }
    }

    async contarEstoque(request: Request, response: Response)
    {
        try 
        {
            const total = await CalcadosRepositorie.ContarEstoque();
            return response.status(200).json({ total_de_pares: total });
        } 
        catch (error) 
        {
            return response.status(400).json({
            message: "Erro ao calcular estoque",
            error
            });
        }
    }

    async comprar(request: Request, response: Response) // extra que eu criei e simular uma compra, reduzindo por 1 do estoque
    {
        try
        {
            const { id } = request.params;
            
            const resultado = await CalcadosRepositorie.compra(Number(id));

            if (!resultado)
            {
                return response.status(400).json({ message: "Produto esgotado ou não encontrado." });
            }

            return response.status(200).json(resultado);
        }
        catch (error) 
        {
            return response.status(400).json({
            message: "Erro ao realizar compra",
            error
            });
        }
    }
}   

export default new CalcadosController();