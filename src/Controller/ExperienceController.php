<?php

namespace App\Controller;

use App\Entity\Experience;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

/**
 * @Route("/api", name="api")
 */
class ExperienceController extends ApiController
{
    /**
     * @Route("/experiences", name="get_experiences", methods={"GET"})
     * @param ManagerRegistry $managerRegistry
     * @return Response
     * @throws ExceptionInterface
     */
    public function getExperience(ManagerRegistry $managerRegistry): Response
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        $entityManager = $managerRegistry->getManager();
        $format = 'Y-m-d H:i:s';
        $experience = $entityManager->getRepository(Experience::class);
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($serializer->normalize($experience->findAll(), 'json')));
        return $response;
    }
    /**
     * @Route("/experience", name="post_experience", methods={"POST"})
     * @param ManagerRegistry $managerRegistry
     * @return Response
     */
    public function addExperience(ManagerRegistry $managerRegistry): Response
    {
        $entityManager = $managerRegistry->getManager();
        $format = 'Y-m-d';
        $experience = new Experience();
        $experience->setTitle($_POST['title']);
        $experience->setType(boolval($_POST['type']));
        $experience->setCompany($_POST['company']);
        $experience->setLocation($_POST['location']);
        $experience->setIsActual(boolval($_POST['is_actual']));
        $experience->setStartDate(DateTime::createFromFormat($format, $_POST['start_date']));
        if (boolval($_POST['is_actual']) === false){
            $experience->setEndDate(DateTime::createFromFormat($format, $_POST['end_date']));
        }
        $experience->setDescription($_POST['description']);
        $experience->setPicture($_POST['picture']);
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $entityManager->persist($experience);
        $entityManager->flush();

        $response->setContent(json_encode($experience));

        return $response;
    }
}
